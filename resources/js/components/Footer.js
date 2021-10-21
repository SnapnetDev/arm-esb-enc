export default function Footer() {
  const year = new Date();
  return (
    <footer className="p-4 footer bg-base-200 text-base-content font-medium footer-center">
      <div>
        <p>Copyright © {year.getFullYear()} - All right reserved by Snapnet Ltd</p>
      </div>
    </footer>
  );
}
