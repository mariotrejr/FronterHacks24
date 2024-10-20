"use client"
import { useState } from 'react';

// Resizing function
function resizeImage(imageFile, maxWidth = 512, maxHeight = 512) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.floor((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.floor((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result.split(',')[1]); // Base64-encoded image
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
      }, 'image/jpeg');
    };

    img.onerror = reject;
  });
}

// Image Upload Component
export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  async function handleImageUpload(event) {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    try {
      const resizedBase64Image = await resizeImage(imageFile);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: resizedBase64Image }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error uploading or analyzing image:', error);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {result && <div>Result: {result}</div>}
    </div>
  );
}
