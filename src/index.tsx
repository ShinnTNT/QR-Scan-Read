import { Suspense } from "react"
import {Routes,Route} from "react-router-dom"
import QrGenerater from "./pages/QR-Generator"
import QrScanner from "./pages/QR-Scanner"

export default function Index () {
  return <Suspense>
    <Routes>
      <Route path="/" element={<QrGenerater/>}/>
      <Route path="/qr-scanner" element={<QrScanner/>}/>
    </Routes>
  </Suspense>
}
