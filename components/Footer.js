export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto py-6">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Created by Gilvan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
