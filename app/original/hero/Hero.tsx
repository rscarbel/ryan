export default async function Hero() {
  return (
    <header className="flex flex-col items-center justify-center">
      <h1 className="original-h1" id="heading">
        Fullstack software engineer, husband, cat-dad
      </h1>
      <h3 className="original-h3" id="subheading">
        I write clean code, make friends with everyone, and love my life.
      </h3>
      <span id="profile-picture">
        <img
          src="https://ryanscarbel.com/src/images/cartoon_ryan.png"
          width="150px"
          alt="Ryan Scarbel Profile Picture."
        />
      </span>
    </header>
  );
}
