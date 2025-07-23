// backgroundTasks.js
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import { getNotifications } from '../api/noti/noti'; // Giả sử đây là hàm gọi API của bạn

const BACKGROUND_NOTIFICATION_TASK = 'background-notification-check';

// 1. Định nghĩa tác vụ
TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error('Lỗi tác vụ nền:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;;
  }
  if (data) {
    console.log('Tác vụ nền được kích hoạt với dữ liệu:', data);

    try {
      // 2. Gọi API để lấy dữ liệu mới
      const res = await getNotifications(); // Gọi API của bạn
      if (res && res.data) {
        const unreadNotifications = res.data.filter((noti) => noti.viewed === 0);

        if (unreadNotifications.length > 0) {
          // 3. Gửi thông báo cục bộ
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Bạn có thông báo mới!',
              body: `Có ${unreadNotifications.length} thông báo chưa đọc.`,
              sound: 'default',
              data: { fromBackgroundFetch: true, count: unreadNotifications.length }
            },
            trigger: null, // Gửi ngay lập tức
          });
          console.log(`Đã gửi ${unreadNotifications.length} thông báo mới.`);
          return BackgroundFetch.BackgroundFetchResult.NewData;
        } else {
          console.log('Không có thông báo mới.');
          return BackgroundFetch.BackgroundFetchResult.NoData;
        }
      } else {
        return BackgroundFetch.BackgroundFetchResult.NoData;
      }
    } catch (apiError) {
      console.error('Lỗi khi gọi API trong tác vụ nền:', apiError);
      return BackgroundFetch.BackgroundFetchResult.Failed;
    }
  }
});

// Hàm để đăng ký tác vụ khi cần
export const registerBackgroundNotificationTask = async () => {
  const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
  if (notificationStatus !== 'granted') {
    console.warn('Không có quyền thông báo, không thể gửi thông báo nền.');
    return;
  }

  // Kiểm tra xem tác vụ đã được đăng ký chưa
  const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_NOTIFICATION_TASK);
  if (isRegistered) {
    console.log('Tác vụ nền đã được đăng ký.');
    return;
  }

  // Kiểm tra quyền Background Fetch
  const bgFetchStatus = await TaskManager.getStatusAsync();
  if (bgFetchStatus === BackgroundFetch.BackgroundFetchStatus.Restricted || bgFetchStatus === BackgroundFetch.BackgroundFetchStatus.Denied) {
    console.warn('Background Fetch không được phép hoặc bị hạn chế.');
    alert('Vui lòng cho phép ứng dụng làm mới trong nền để nhận cập nhật định kỳ.');
    return;
  }

  // Đăng ký tác vụ với Expo Background Fetch (cơ chế định kỳ)
  // Lưu ý: Tần suất chạy do hệ điều hành quyết định, không phải chính xác 15 phút
  await TaskManager.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK, {
    minimumInterval: 60 * 15, // Tối thiểu 15 phút (tính bằng giây)
    // Các tùy chọn khác cho Android:
    startOnBoot: true, // Bắt đầu tác vụ khi thiết bị khởi động (chỉ Android)
    stopOnTerminate: false, // Tiếp tục chạy khi ứng dụng bị đóng (chỉ Android)
  });
  console.log('Đã đăng ký tác vụ nền thành công!');
};

// Hàm để hủy đăng ký tác vụ (nếu cần)
export const unregisterBackgroundNotificationTask = async () => {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_NOTIFICATION_TASK);
  if (isRegistered) {
    await TaskManager.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    console.log('Đã hủy đăng ký tác vụ nền.');
  }
};