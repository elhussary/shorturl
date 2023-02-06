import { useState, useEffect } from "react";
import QR from "./components/Modals/QR";
import QRImage from "./images/QC.png";
import Wave from "react-wavify";

function App() {
  const [link, setLink] = useState(null);
  const [test, setTest] = useState(null);
  const [qrcode, setQrcode] = useState(false);
  const [shortlink, setShortlink] = useState([]);

  const [themes, setThemes] = useState({
    buttontheme: "from-cyan-500 to-blue-500",
    first: "#0AB3D7",
    second: "#3885F4",
  });

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "3fdd3959bbmsh62eaec25346a4cap1f229ejsne607bd0ddfb5",
      "X-RapidAPI-Host": "url-shortener20.p.rapidapi.com",
    },
    body: `{"url":${link}}`,
  };
  const handleShortURL = (e) => {
    e.preventDefault();
    if (!link) {
      alert("Enter a link");
    } else {
      fetch(`https://url-shortener20.p.rapidapi.com/shorten?url=${link}`, options)
        .then((response) => response.json())
        .then((response) => setShortlink([...shortlink, response]))
        .catch((err) => console.error(err));
    }
  };

  const HandleThemes = (btnTheme, wavifyThemeFirst, wavifyThemeSecond) => {
    setThemes({
      ...themes,
      buttontheme: btnTheme,
      first: wavifyThemeFirst,
      second: wavifyThemeSecond,
    });
  };

  // LOAD Theme
  useEffect(() => {
    if (localStorage.getItem("my-theme") === null) {
      localStorage.setItem("my-theme", JSON.stringify({}));
    } else {
      let loadTheme = JSON.parse(localStorage.getItem("my-theme"));
      setThemes(loadTheme);
    }
  }, []);
  // SAVE Theme TO localStorage
  useEffect(() => {
    localStorage.setItem("my-theme", JSON.stringify(themes));
  }, [themes]);

  return (
    <>
      <ul className="flex justify-end p-10 gap-2">
        <li
          className="bg-gradient-to-r from-cyan-500 to-blue-500 block rounded-full w-5 h-5 mb-6 cursor-pointer"
          onClick={() => HandleThemes("from-cyan-500 to-blue-500", "#0AB3D7", "#3885F4")}
        ></li>
        <li
          className="bg-gradient-to-r from-orange-500 to-orange-400 block rounded-full w-5 h-5 mb-6 cursor-pointer"
          onClick={() => HandleThemes("from-orange-500 to-orange-400", "#F9771A", "#FB9039")}
        ></li>
        <li
          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 block rounded-full w-5 h-5 mb-6 cursor-pointer"
          onClick={() => HandleThemes("from-violet-500 to-fuchsia-500", "#925BF6", "#D348F0")}
        ></li>
      </ul>
      <main className="max-w-3xl mx-auto h-[55vh] px-6 lg:px-0 flex flex-col justify-center">
        <section>
          <header className="pb-5">
            <h1 className="font-bold text-2xl">URL Shortener</h1>
            <p className="text-gray-500">URL short built to generate short links</p>
          </header>
          <div>
            <form className="flex item-center pb-6" onSubmit={(e) => handleShortURL(e)}>
              <input
                type="text"
                placeholder="Paste your long link here"
                className="p-3 resize-none w-full border-gray-200 focus:ring-transparent shadow-xs"
                onChange={(e) => setLink(e.target.value)}
              />
              <button
                className={`bg-gradient-to-r ${themes.buttontheme} transition ease-in-out duration-300  px-4 w-40 text-white`}
              >
                Shorten!
              </button>
            </form>
            {shortlink.map((url, idx) => {
              return (
                <div
                  className="border flex items-center justify-between text-sm font-semibold p-4 mb-4 rounded-lg"
                  key={idx}
                >
                  {test === url.source ? (
                    <> {qrcode && <QR QR={url.source} setQrcode={setQrcode} />}</>
                  ) : (
                    <></>
                  )}
                  <a href={url.short_link} target="_blank">
                    {url.short_link}
                  </a>
                  <div className="space-x-1.5">
                    <button
                      onClick={() => {
                        setQrcode(true);
                        setTest(url.source);
                      }}
                    >
                      <img src={QRImage} className="w-4 translate-y-1" alt="QR CODE" />
                    </button>
                    <button
                      onClick={(e) => {
                        navigator.clipboard.writeText(url.short_link);
                        e.target.innerHTML = "Copied!";
                        setTimeout(() => {
                          e.target.innerHTML = "Copy";
                        }, 500);
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <div className="fixed left-0 bottom-0 w-full translate-y-1.5">
        <Wave
          fill="url(#gradient)"
          paused={false}
          options={{
            height: 65,
            amplitude: 40,
            speed: 0.2,
            points: 10,
          }}
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="10%" stopColor={themes.first} />
              <stop offset="90%" stopColor={themes.second} />
            </linearGradient>
          </defs>
        </Wave>
      </div>
    </>
  );
}

export default App;
