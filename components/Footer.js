export default function Footer() {
  const gotoMyPortfolio = () => {
    window.open("https://ahmad-gilvan.vercel.app", "_blank");
  };
  return (
    <footer className="bg-white border-t mt-auto py-6">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()}, TaskFlow.</p>
            <span>Made with ❤️ by  
                <a target="_blank" rel="noopener noreferrer" onClick={gotoMyPortfolio}> Ahmad Gilvan.</a>
            </span>
      </div>
    </footer>
  );
}
