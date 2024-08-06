import React, { useRef, useState, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const BarcodeReader: React.FC = () => {
  const readerRef = useRef<Html5Qrcode | null>(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  const startCamera = useCallback(async () => {
    readerRef.current = new Html5Qrcode('reader');
    try {
      await readerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText: string) => {
          alert(decodedText);
        },
        () => {}
      );
      setIsCameraStarted(true);
    } catch (err) {
      console.error('Failed to start scanner:', err);
    }
  }, []);

  const stopCamera = useCallback(async () => {
    if (readerRef.current) {
      await readerRef.current.stop();
    }
    setIsCameraStarted(false);
  }, []);

  return (
    <div>
      {isCameraStarted ? (
        <button onClick={stopCamera}>スキャンを停止</button>
      ) : (
        <button onClick={startCamera}>スキャンを開始</button>
      )}
      <div id="reader" style={{ width: '80vw' }} />
    </div>
  );
};

export default BarcodeReader;