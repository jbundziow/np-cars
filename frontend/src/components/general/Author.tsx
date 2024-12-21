import LogoAuthor from '../../images/logo/stickysoft-long.png';

export default function Author() {
  return (
    <div className="flex justify-center items-center">
      <a href="https://www.stickysoft.pl" className="py-1 px-2">
        <img src={LogoAuthor} alt="Logo autora" className="max-w-30" />
      </a>
    </div>
  );
}
