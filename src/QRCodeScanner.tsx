import React, { useRef, useEffect, useState, useCallback } from 'react';
import jsQR from 'jsqr';

const QRCodeScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  const startCamera = useCallback(async () => {
    if (!videoRef.current) return;
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
    setIsCameraStarted(true);
  }, []);

  const stopCamera = useCallback(() => {
    if (!videoRef.current) return;
    const stream = videoRef.current.srcObject as MediaStream;
    stream.getTracks().forEach(t => t.stop());
    setIsCameraStarted(false);
  }, []);

  const scan = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {inversionAttempts: "dontInvert"});
        if (code) {
          console.log(code.data);
          alert(code.data);
        }
      }
    }
    requestAnimationFrame(scan);
  }, []);


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => requestAnimationFrame(scan);
    video.addEventListener('canplay', handleCanPlay);
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [scan]);

  return (
    <div>
      {isCameraStarted ? (
        <button onClick={stopCamera}>スキャンを停止</button>
      ) : (
        <button onClick={startCamera}>スキャンを開始</button>
      )}

      <video ref={videoRef} style={{ width: '100%', maxWidth: '500px', display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: isCameraStarted ? 'block' : 'none' }} />
    </div>
  );
};

export default QRCodeScanner;