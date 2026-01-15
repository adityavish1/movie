const Footer = () => {
	return (
		<footer className="py-6 bg-black text-white border-t border-gray-800">
  <div className="flex flex-col items-center justify-center">
    <p className="text-sm text-center text-muted-foreground leading-loose">
      Built by{" "}
      <a
        href="https://github.com/adityavish1/movie"
        target="_blank"
        className="font-medium underline underline-offset-4"
      >
        Aditya Vishwakarma
      </a>
      . The source code is available on{" "}
      <a
        href="https://github.com/adityavish1/movie"
        target="_blank"
        rel="noreferrer"
        className="font-medium underline underline-offset-4"
      >
        GitHub
      </a>
      .
    </p>
  </div>
</footer>

	);
};
export default Footer;
