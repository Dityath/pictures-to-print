import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

function App() {
  const [files, setFiles] = useState<string[]>([]);

  const [paper, setPaper] = useState<"a4" | "f4" | "a5">("a4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );
  const [colorMode, setColorMode] = useState<"color" | "black-and-white">(
    "color"
  );

  const [photosSizeWidth, setPhotosSizeWidth] = useState<number>(3);
  const [photosSizeHeight, setPhotosSizeHeight] = useState<number>(4);
  const [fitPhoto, setFitPhoto] = useState<boolean>(true);

  const paperRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const paperSizeAndOrientation = () => {
    if (paper === "a4" && orientation === "portrait") {
      return "w-[793px] h-[1122px]";
    } else if (paper === "a4" && orientation === "landscape") {
      return "w-[1122px] h-[793px]";
    } else if (paper === "f4" && orientation === "portrait") {
      return "w-[793px] h-[1247px]";
    } else if (paper === "f4" && orientation === "landscape") {
      return "w-[1247px] h-[793px]";
    } else if (paper === "a5" && orientation === "portrait") {
      return "w-[559px] h-[793px]";
    } else if (paper === "a5" && orientation === "landscape") {
      return "w-[793px] h-[559px]";
    } else {
      return "w-[793px] h-[1122px]";
    }
  };

  const handlePrint = useReactToPrint({
    content: () => paperRef?.current,
  });

  return (
    <div className='flex m-5'>
      <div className='flex-col flex gap-4'>
        <h1 className='font-medium text-xl'>Pictures to print</h1>
        {/* inputs */}
        <div className='flex gap-5'>
          <p>File :</p>
          <input type='file' onChange={handleChange} multiple />
        </div>
        <div className='flex gap-5'>
          <p>Paper Size :</p>
          <select
            name='paper'
            value={paper}
            onChange={(e) => setPaper(e.target.value as "a4" | "f4" | "a5")}>
            <option value='a4'>A4 (21 x 29.7 cm)</option>
            <option value='f4'>F4 (21 x 33 cm)</option>
            <option value='a5'>A5 (21 x 29.7 cm)</option>
          </select>
        </div>
        <div className='flex gap-5'>
          <p>Orientation :</p>
          <select
            name='orientation'
            value={orientation}
            onChange={(e) =>
              setOrientation(e.target.value as "portrait" | "landscape")
            }>
            <option value='portrait'>Portrait</option>
            <option value='landscape'>Landscape</option>
          </select>
        </div>
        <div className='flex gap-5'>
          <p>Color Mode :</p>
          <select
            name='colorMode'
            value={colorMode}
            onChange={(e) =>
              setColorMode(e.target.value as "color" | "black-and-white")
            }>
            <option value='color'>Color</option>
            <option value='black-and-white'>Black and White</option>
          </select>
        </div>
        <div className='flex gap-5'>
          <p>Photos Size :</p>
          <div className='flex gap-2'>
            <input
              className='max-w-4'
              value={photosSizeWidth}
              onChange={(e) => setPhotosSizeWidth(Number(e.target.value))}
            />
            <p>x</p>
            <input
              className='max-w-4'
              value={photosSizeHeight}
              onChange={(e) => setPhotosSizeHeight(Number(e.target.value))}
            />
          </div>
        </div>
        <div className='flex gap-5'>
          <p>Fit Photo :</p>
          <input
            type='checkbox'
            checked={fitPhoto}
            onChange={(e) => setFitPhoto(e.target.checked)}
          />
        </div>
        {/* submit button */}
        <button
          onClick={handlePrint}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-10'>
          Print
        </button>
      </div>
      {/* paper canvas */}
      <div
        className={`border-2 border-black ${paperSizeAndOrientation()} p-[18.897637795px] gap-2`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${
            photosSizeWidth * 37.795275591
          }px, 1fr))`,
          gridAutoRows: `${photosSizeHeight * 37.795275591}px`,
        }}
        ref={paperRef}>
        {files.map((file, index) => (
          <img
            style={{
              width: `${photosSizeWidth * 37.795275591}px`,
              height: `${photosSizeHeight * 37.795275591}px`,
            }}
            className={`${fitPhoto ? "object-cover" : "object-contain"}`}
            key={index}
            src={file}
            alt={`Image ${index}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
