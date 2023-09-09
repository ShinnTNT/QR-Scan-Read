import { useState } from "react"

import QRCode from 'qrcode'

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

const QrGenerater = () => {

  const [value,setValue] = useState<string>('')
  const [qrImage,setQrImage] = useState<string>("")
  
  const handleGenerate = async () => {
    try {
    const qr_image = await QRCode.toDataURL(value)
    setQrImage(qr_image)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={parent}>
      <div style={container}>
         <input type="text" placeholder="Generate Code..." value={value} onChange={(e)=>setValue(e.target.value)}/>
         <button onClick={handleGenerate}>Generate</button>

         {
          qrImage &&  <a href={qrImage} download>
            <img src={qrImage} width="100%" height={300} alt={value}/>
          </a>
         }
      </div>


    </div>
  )
}

export default QrGenerater