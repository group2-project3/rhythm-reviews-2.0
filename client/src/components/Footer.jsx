import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (!isHomePage) {
    return null;
  }
  
return  (
    <>
<div className="flex flex-col items-center justify-between min-h-screen mt-64">
<footer className="fixed bottom-0 items-center w-full py-4 text-center text-white bg-gray-800">
  © 2023 Rhythm Reviews Site, developed by Jen Stemkowski, Ashley Zemina, Gilberto Rosario, Jason Torrealba, Florian Kreuk
</footer>
</div>
</>
)
}

export default Footer;