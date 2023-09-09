import {Html5QrcodeScanner,Html5QrcodeResult} from "html5-qrcode"
import { useEffect } from 'react';

const parent = {
  maxWidth:"100%",
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  margin:"auto",
}

const container = {
  width:"300px",
  height:"600px"
}

const qrcodeRegionId = "html5qr-code-full-region";

interface Props {
  fps:number;
  qrbox:{
    width:number;
    height:number;
  };
  aspectRatio:number;
  disableFlip:boolean
}

const createConfig = (props:Props) => {
    let config:Props = {
      fps:0,
      qrbox:{
        width:0,
        height:0
      },
      aspectRatio:0,
      disableFlip:false
    };
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin = (props:any) => {

  useEffect(() => {
      // when component mounts
      const config = createConfig(props);
      const verbose = props.verbose === true;
      // Suceess callback is required.
      if (!(props.qrCodeSuccessCallback)) {
          throw "qrCodeSuccessCallback is required callback.";
      }
      const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
      html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

      // cleanup function when component will unmount
      return () => {
          html5QrcodeScanner.clear().catch(error => {
              console.error("Failed to clear html5QrcodeScanner. ", error);
          });
      };
  }, []);

  return (
      <div id={qrcodeRegionId} />
  );
};


const QrScanner = () => {

  const onNewScanResult = (decodedText:string, decodedResult:Html5QrcodeResult) => {
    console.log(decodedText,decodedResult);
    
    // handle decoded results here
};
  

  return (
    <div style={parent}>
      <div style={container}>
          <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
          />
      </div>
    </div>
  )
}

export default QrScanner