// Kleine api route voor movies

const express = require("express");
// Add the express module to your application
const router = new express.Router();
const sharp = require("sharp"); // Package for resizing images
const multer = require("multer");

// Ik heb een connectie gemaakt met mijn database en data en files naar mijn database geschreven

// Dit wil ik schrijven naar database
const movies = [
  {
    title: "La Casa de Papel",
    subtitle:
      "Deze verslavende Spaanse monsterhit is zó populair; alleen daarom moeten we ‘m wel op deze beste series op Netflix-lijst zetten. La Casa de Papel is misschien geen diep doordacht meesterwerk, maar wat boeit dat? Meesterbrein El Professor en zijn team getalenteerde criminelen zorgden voor loeispannende scènes die hun weerga niet kennen. We zien die (vele) plotgaten dan ook graag door de vingers. La Casa de Papel gaat al vier seizoenen als een speer en hopelijk gaat 't nog jáááren door.",
  },
  {
    title: "Breaking Bad",
    subtitle:
      "Alles wat hier gaan zeggen over Breaking Bad, weet je waarschijnlijk al. Deze misdaadserie behoort tot het beste wat Netflix te bieden heeft. En dat is door alles en iedereen al talloze keren gezegd. Als je Walter ‘Heisenberg’ White’s weg van treurige docent naar keiharde drugsbaas nu nog steeds niet gezien hebt, raden we je aan NU alles opzij te zetten en gewoon maar te beginnen. Bereid je voor op een epische trip! Verfilming El Camino: A Breaking Bad Movie kan zeker tippen aan de meesterlijke serie en geef prequel-serie Better Call Saul - bij vlagen minstens zo goed als Breaking Bad - ook gerust een kans.",
  },
  {
    title: "Stranger Things",
    subtitle:
      "Huh? Breaking Bad – ‘de beste serie EVER’ – niet op één? Inderdaad, we gaan toch echt voor Stranger Things als beste Netflix serie ooit. Een compleet nieuw idee uit de grond stampen is altijd tricky. Wat de Duffer-broertjes met Stranger Things-deden, is ongeëvenaard. Een toffe 80’s-setting, nieuwe acteurs die uitgroeiden tot iconen, slimme verwijzingen naar Stephen King-films én een cast met alleen maar toppers; werkelijk álles klopt aan Stranger Things.",
  },
];

/* Met Multer kunnen we images opslaan in onze database in binaire format */
// https://www.npmjs.com/package/multer
// https://medium.com/@svibhuti22/file-upload-with-multer-in-node-js-and-express-5bc76073419f

const upload = multer();

    router.post("/movies", upload.single("image"), async (req, res) => {
      console.log(req.body);

      const buffer = await sharp(req.file.buffer)
        .resize({ width: 500, height: 500 })
        .png()
        .toBuffer();

      try {
        const movie = await db
          .collection("movies")
          .findOneAndUpdate(
            { title: "Stranger Things" },
            { $set: { image: buffer } }
          );

        console.log(movie);
      } catch (e) {
        console.log(e);
      }

      res.send("Check");
    });


module.exports = router;
