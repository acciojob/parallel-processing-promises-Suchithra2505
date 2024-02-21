//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
// Function to download images and display them on the webpage
async function downloadAndDisplayImages(imageArray) {
  try {
    // Use Promise.all to download images in parallel
    const imagePromises = imageArray.map(imageObj => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image's URL: ${imageObj.url}`));
        img.src = imageObj.url;
      });
    });

    // Wait for all images to be downloaded
    const images = await Promise.all(imagePromises);

    // Display the downloaded images on the webpage
    images.forEach(img => {
      output.appendChild(img);
    });
  } catch (error) {
    // If any image fails to download, show the error message
    console.error(error.message);
  }
}

// Event listener for the button click to trigger image download and display
btn.addEventListener("click", () => {
  // Clear the output div before downloading new images
  output.innerHTML = "";
  
  // Call the function to download and display images
  downloadAndDisplayImages(images);
});

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
