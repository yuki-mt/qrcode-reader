import React, { useRef, useCallback, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const BarcodeReader: React.FC = () => {
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  const startCamera = useCallback(async () => {
    readerRef.current = new BrowserMultiFormatReader();
    if (!videoRef.current) return;
    const devices = await readerRef.current.listVideoInputDevices();
    const lastDeviceId = devices[devices.length - 1].deviceId;
    readerRef.current?.decodeFromVideoDevice(lastDeviceId, videoRef.current, (result, err) => {
      if (result) {
        // Your logic here
        alert(result.getText());
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error(err);
      }
    });
    setIsCameraStarted(true);
  }, []);

  const stopCamera = useCallback(() => {
    readerRef.current?.reset();
    setIsCameraStarted(false);
  }, []);

  return (
    <div>
      {isCameraStarted ? (
        <button onClick={stopCamera}>スキャンを停止</button>
      ) : (
        <button onClick={startCamera}>スキャンを開始</button>
      )}
      <video ref={videoRef} style={{ width: '80vw' }} />
    </div>
  );
};

export default BarcodeReader;