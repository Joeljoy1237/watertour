self.addEventListener("push", function (event) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/logo.png",
      data: {
        url: data.url,
      },
    });
  });
  
  self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    if (event.notification.data?.url) {
      clients.openWindow(event.notification.data.url);
    }
  });
  