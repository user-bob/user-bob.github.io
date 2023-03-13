import Header from "./header";
import Footer from "./footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div
      className="container flex flex-col min-w-full min-h-screen bg-white dark:bg-gray-900"
    >
      <Header />
      <hr className="border-gray-200 dark:border-gray-700" />
      <div className="flex-grow">{children}</div>
      <hr className="border-gray-200 dark:border-gray-700" />
      <Footer />
    </div>
  );
}