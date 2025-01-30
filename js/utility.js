export const imageToBase64 = function (imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      resolve(reader.result); // Resolve with Base64 string
    };

    reader.onerror = function (error) {
      reject(error); // Reject if there is an error
    };

    reader.readAsDataURL(imageFile); // Convert image to Base64 string
  });
};

export const generateUniqueId = function () {
  return "id" + Date.now() + Math.floor(Math.random() * 1000);
};
