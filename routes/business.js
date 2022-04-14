const express = require("express");
const router = express.Router();
const path = require("path");
const {
  addBusinessSync,
  addNewBusiness,
  loadBusinessSync,
  saveAllBusinessOwners,
  saveAllBusinessContacts,
} = require(path.join(__dirname, "../assets/asyncFunction.js"));
const loadBusinessTable = require(path.join(
  __dirname,
  "../assets/loadBusinessTable.js"
));
const { jsPDF } = require("jspdf");
const loadActivity = require(path.join(__dirname, "../assets/loadActivity.js"));
const saveBusiness = require(path.join(__dirname, "../assets/saveBusiness.js"));
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const aws = require("aws-sdk");
const s3 = new aws.S3({ apiVersion: "2006-03-01" });
const uploadPicture = multer({
  storage: multerS3({
    s3: s3,
    bucket: "clientes-jrc/logo",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => cb(null, { filename: file.fieldname }),
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      var fileName = `${uuid()}.${req.body.businessID}.${file.originalname}`;
      var shortName = `${file.originalname}`;
      saveBusiness.saveBusinessPictureURL(
        req.body.businessID,
        fileName,
        shortName
      );
      cb(null, fileName);
    },
  }),
});

const uploadContract = multer({
  storage: multerS3({
    s3: s3,
    bucket: "clientes-jrc/cotizacion",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => cb(null, { filename: file.fieldname }),
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      var fileName = `${uuid()}.${req.body.businessID}.${file.originalname}`;
      var shortName = `${file.originalname}`;
      saveBusiness.saveBusinessContractURL(
        req.body.businessID,
        fileName,
        shortName
      );
      cb(null, fileName);
    },
  }),
});
const uploadD140 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "clientes-jrc/d140",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => cb(null, { filename: file.fieldname }),
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      var fileName = `${uuid()}.${req.body.businessID}.${file.originalname}`;
      var shortName = `${file.originalname}`;
      saveBusiness.saveBusinessD140URL(
        req.body.businessID,
        fileName,
        shortName
      );
      cb(null, fileName);
    },
  }),
});

// get methods
router.get("/", (req, res) => {
  loadBusinessTable
    .loadBusinessTable(req.session.user, req.session.role)
    .then((result) => {
      objects = result;
      res.render("business");
    })
    .catch((err) => alert(err));
});

router.get("/new", (req, res) => {
  addBusinessSync(req, res);
});

router.get("/:id", (req, res) => {
  loadBusinessSync(req, res);
});

// post methods

router.post("/", (req, res) => {
  addNewBusiness(req);
  loadBusinessTable
    .loadBusinessTable(req.session.user, req.session.role)
    .then((result) => {
      objects = result;
      res.redirect("business");
    })
    .catch((err) => alert(err));
});

router.post("/owner", (req, res) => {
  saveBusiness.deleteBusinessOwner(req.body.businessID, req.body.actionID);
  res.send("Success");
});

router.post("/activity", (req, res) => {
  console.log(req.body.actionID);
  saveBusiness.deleteBusinessActivity(req.body.businessID, req.body.actionID);
  res.send("Success");
});

router.post("/picture", (req, res) => {
  saveBusiness.deleteBusinessPicture(req.body.businessID, req.body.actionID);
  res.send("Success");
});

router.post("/contract", (req, res) => {
  saveBusiness.deleteBusinessContract(req.body.businessID, req.body.actionID);
  res.send("Success");
});

router.post("/contact", (req, res) => {
  saveBusiness.deleteBusinessContact(
    req.body.businessID,
    req.body.actionID,
    req.body.contactAction
  );
  res.send("Success");
});

router.post("/d140", (req, res) => {
  saveBusiness.deleteBusinessD140(req.body.businessID, req.body.actionID);
  res.send("Success");
});

router.post(
  "/picture/new",
  uploadPicture.single("businessPicture"),
  (req, res) => {
    res.redirect(req.get("referer"));
  }
);

router.post(
  "/contract/new",
  uploadContract.single("businessContract"),
  (req, res) => {
    res.redirect(req.get("referer"));
  }
);

router.post("/d140/new", uploadD140.single("businessD140"), (req, res) => {
  res.redirect(req.get("referer"));
});

router.post("/savePDF", (req, res) => {
  const doc = new jsPDF();
  var imgData =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWkAAAF6CAYAAADbOal7AAAACXBIWXMAABYlAAAWJQFJUiTwAAAVR0lEQVR4nO3d+1UUWdcH4OJb8z9OBDgR6ESARoBGoBMBTARABDoRiBEoESARKBEIEYxE0O/aPfQ3DIJ2Q+3qc3metXq9l6VtdfepX53adS4bwzA8GwAo0XmE9MxPA1Ckw//zuwCUS0gDFExIAxRMSAMUTEgDFExIAxRMSAMUTEgDFExIAxRMSAMU7JdVDm02m234MQHub2Nj42AYhv1l30BPGqBgQhqgYEIaoGBCGqBgQhqgYEIaoGBCGqBgQhqgYCtNZlnWxsaGzW2B3pzPZrPzsT9zSkgPw3CS9L4ApTochuFg7GNT7gAomJAGKJiQBiiYkAYomJAGKJiQBiiYkAYomJAGKJiQBihY1ozDpW1vb2sfQJHOz8+Hi4uLtR7a2kP606dP6z4EgFsdHBwMh4eHa/1ylDsACiakAQompAEKJqQBCiakAQompAEKJqQBCiakAQq29sksQF1iFl68wuPHj+cv8ghp4P99+fJl/ooQXswGjv99eXm59Je0WOrh2bNn8wB/+vTp/MX9CGnoWITxx48f56/T09NRvojF+1x/v83NzXlov3jxYv569OiRZrckIb1m0UvZ29sb/SDevn07Se8lTrypxQl+/bPFf1/8f07+n/v27dtwdHQ0f52dnU3yb0ZP/Pj4eP76448/hp2dnXm7X0f7qY2QXrM4YcbqwVwX7zuFjGNfRpzst4keW4R1nPyL/xTc/4g2ERfveK1SvsiwCOwojcQiRsL6bkKapkT4xIXj+sXjyZMn8xB4/fp1t7XRCOYIw3WH803xOz1//nzes46evQvq9wzBo3lxS//XX38Nv//++/xBVgTWVHca6xY157gw/fnnn8UF9HXRq47fJmrj/JeQpiuxgHsE1q+//jrvWS+GkrUoAi8Ceqq680PFReTly5fziyj/EtJ06/3798Nvv/3WZFhH6SACr+Te813iIhq/Cf8Q0nQvwjp6nFGzbUEEdIygqFn8JnrU/xDScHWrHdskRVjHsMhatRDQC9Gjjs/TOyEN10T9Nh4w1tiLi4tLKwG9EGOpa75ojkFIwy0WddFaRoHEccZMvtbEHU7v9WkhDXeIumiMr64hqCPIYuRKi+LuppXnBfchpOEHIiBKD+pYCOmuGZit6Gls+01CGn6i9KDuoRwQZY+MNW5qIKRhCaUGdYx+aLXMcVOUn1qefHQXIQ1LiqAurdfaW622x7HTQhpWELXfUm67e+pFL8Rn7q02LaRhRbFYUwkLAfU40SNq070twiSk4R7WPYY6arPrWst73XoreVhPGu5hMcliXb26qYNqa2trPlkmps1f33g2LlQxIzCGAU510YhnA3GR6mUDXCEN9xT16Qjpdcz0m+risMzOKYvPH8EZfzZGYWSLz9/LkDwhTXFiJ5Wf7dCx6g7WWRb79E25o0gE1BQPDN+8ebNSEEbPNurkcYcRwZ35+8S/I6RhTeJWftk97yKsF7fbEV5TB3eE5WJrqqlM0Yt+9+7dvYcbxm8Xv0f8Z9bvESWPKLX0sN2WB4dULWqkESaLoVkfPnyY36JPKUJ6ykkWEYCZ9vf3HzwePH6X7ItJ9vdQCiFNU+I2O07ek5OTedlkCtFbnKonHReDzFLHogY9huhJ7+7uph2rkIaKRUBEGSR6hVOYaspydjCNPWokAn9zc3PU91wQ0tCACImor2YFxXVTDIvLDKZXr17NyxRjippx1gO+RV26dUKa5kV9NcItO6inmLKc2VvPWpckc72THnZtEdJ0IXqI2T3dKaYsZ00Yifr9siNqVhVD83Z2dlLeu4eSh5CmG9Gjy65RZ66nUWMveiFrwo+eNDQmatSZQ/Sip5sVppkhndWLzn7/HtaXFtJ0J3v1uKxb8KxeY9Tqx35geFOUPGL9j7HFw8PWCWm6E4GRWfbIqktnPZTMDuiFrN506yUPIU2XYlhYbeN3s8Iou9SxkHUxaH0YnpCmSzF+N+thVozyyAjU2nvSWf9O6yM8hDTdylxFLSM4skJ6qkWKproYtEZI060IjYyHWUNSaSLrIdlU5Y64GGSUmPSkoWFZJY8ehobdh9706oQ0XcvqRday/+BUKwUuZJRWjO6AhmXe6o9ZQ866pZ960fyMnnQJO/RkEtJ0LUKqpro0t2t5GJ6QpntZddIa6tJT14hNaFmdkKZ7PYd0D3sE1k5I070aRhz0sgvJfSl3QMOyepM1BOvUPWnljtUJabrX89hd45bLJ6TpnrosJRPScLWm8thqmdBC2YQ0VHDb39I084xx6S0/WBXSUIGskF5HqSc2XWB5Qho65sFh+YQ0GBpGwYQ0JGp9ayfyCWmAgglpgIIJaaB6LY9JF9LQ6TjpjAk8jE9IQwVTwy8uLkZ/T8Pv6iCkIZEheDyUkIZEhuDxUEIaoGBCGqBgQhqgYEIaoGBCGqBgQhqgYEIaoGBCGjqdfWeHlDoIaeh0x3AhXQchDYUza7FvQhoKZ/2PvglpgIIJaYCCCWmAgglpgIIJaYCCCWmAgglpgIIJaYCCCWmAgglpgIIJaYCCCWmAgglpgIIJaYCCCWmAgglpgIIJaeiU7bPqIKSh0y2qhHQdhDTYooqCCWmAgglpgIIJaYCCCWmAgglpSPTs2TNfLw8ipAEKJqQBCiakAQompAEKJqSh02nh1EFIQ+K08EePHvl6eRAhDYmePn3q6+VBhDRAwYQ0QMGENAzDcH5+PvrXsLm56avlwYQ0JIW0ejRjENIABRPSkNSThjEIaRiG4eLiYvSvYawV8D59+jTK+1AnIU33zDakZEKa7mXNNvTgkDEIabqXVY82JZwxCGm6l9WTfvz4ce9fLSMQ0nRPSFMyIU33Tk9PR/8Knjx50vvXykiENF3LGt6mF81YhDRd+/jxY8rHN7KDsQhpupYV0mNNZIFfuv8G6FaUOjJmGg560j/ku1mNkKZbBwcHKR99a2vLGOkfePv2bbHHViLlDroUveiMUR2DUgcjE9J0KasXPQhpRiak6c7R0VFaL3oQ0oxMSNOVWPFub28v7SPHJBZjpBmTkKYrUea4vLxM+8ivX7/WoBiVkKYbMSb6r7/+Sv24L1680KAYlZCmC7GIUnYvd3t7W6mD0QlpmhcBHQ/zMsscg1IHSYQ0TYvx0FMEdExgEdJkaHLGYZyYY69uFrexTsK6xEPCw8PDSY45c9w1fWs2pMc+OaPeKKTrEL9/DLM7Ozub5Hj1oslk7Q6aEZNUsieq3EYvmkxCmmpFjzkeCi7KW9l159vE5BW9aDIJaYoTpYq7VpGLGYNTlTGWYUU3sglpilNSCP/I7u6udTpIZwge3EOUOfSimYKQhhVtbm6mbbsFNwlpWFE8pDT9m6kIaVjBu3fv7NHHpIQ0LCkC2nA7pmZ0B/zEogZtJAfroCcNPxCjOBaLNME6CGm4w6tXr+YBrQbNOil3wA2xYFKMgbbLCiUQ0nAlas8xJf1H09JhakKa7glnSiak6VaUNSKYY1idcKZUQpquRDBHrTmC2QNBaiCkaVoMoYswjiF08TKdm9oIaZp1cnJifDPVM04aoGBCGqBgQhqgYEKaZj1//nw+isMC/dRMSNO09+/fDy9fvpyPgxbY1EhI04XLy8vvAvvLly9+fIpnCB7FidXn7hrPfHh4+ODDXQR2vHZ2dvSuKZqQpjjRy71rfPPR0dFwcXEx2iEfHx9rABRNuYOqZMwYPD8/1wgolpCmKhkzCNWmKZmQpioZPWkhTcmENFXJWLkutsiCUglpqpIR0mrSlExIU51YfnRMMVrk27dvGgJFEtJUR12anghpqqMuTU+ENNXJGIanLk2phDTVUe6gJ0Ka6mSE9NnZmYZAkYQ0Vdre3h79sPWmKZGQpkoZDw+FNCWyCh5VUpeuT3y/GePRW98RXkhTJT3p+uzt7Q2np6ejH/dsNmv6e1PuoEpCml4IaaoUW2BtbW2NeuixY4vx0pRGSFMtGwDQAyFNtTIeGJkeTmmENNUywoMeCGmq5eEhPRDSVCsjpMfciRzGIKSp2tgbAAzq0hRGSFM1dWlaJ6SpWg916YwLEfUQ0lSthw0AhHTfhDRVywiwjPUl4L6ENFXL6mWqS1MKIU31MjYAMD2cUghpqmdSCy0T0lQvo+RhrDSlENJUT0+alglpqpcR0rG2dMZWT7AqIU31MjYAGPSmKYSQpgnq0rRKSNOEjJmHetKUQEjTBFtp0SohTRMyHh6enZ1pHKydkKYJGSE9qEtTACFNMzI2AFDyYN2ENM2wAQAtEtI0w8xDWiSkaUbGMDxrS7NuQppmZK0trS7NOglpmmEDAFokpGlKxgYArYa04YV1ENI0xcNDWiOkaYpheLRGSNOUjJ70xcWFtaVZGyFNU7Kmh+tNsy5CmqbYAIDWCGmaoy5NS4Q0zbEBAC0R0jQnoydtbWnWRUjTHA8PaYmQpjlCmpYIaZpkAwBaIaRpUkZd2loXrIOQpknW8KAVQpomZQzDu7y8VPJgckKaJtkAgFYIaZqUFdLq0kxNSNOsVjYAiPVI6JeQplkZDw/XUe7IGvdNHYQ0zTI9nBYIaZqV1QNtpS6tvl4HIU2zTA+nBUKaZmVtAGAYHlMS0jTNBgDUTkjTtIyZh6enpxoNkxHSNC1rUoveNFMR0jQt6+GhujRTEdI0zQgPaiekaV7GBgDGGDMVIU3zMurSyh1MRUjTvIySx8XFxfDt27eqv7raj78XQprmZQzDGyauS2es6GcdkjoIaZpnbWlqJqRpnl1aqJmQpgutbADAf21ubjb/jQhpupDx8FBNd/162BBBSNMFdWlqJaTpgunhtzMMr3xCmi6YHn47dfXyCWm6kLUBwFQhlzXWm/IJabphAwBqJKTpRkZv9PLy0nhpUglpumEDgO9N+eAw43uKMlbrhDTd8PDwe1Mee9x1jM04aWhIzSHdQxhxOyFNVzI2AJgipHu4red2QpquZNSlY23pWk1V7sh6uKomDY3JKhvUOj18qgeHWSGtJg2NqXUDgKyRKZRPSNOVWofhZR336elpyvvelPX9KHdAY2wAsB5ZZRXlDmhQxgYAU/RIM9YeGSZ6eGj6/P0JabpT63jprLuAKR4eZvwbGRfbEglpumN6+H9NMTJlqtp3i4Q03al1A4Bajzvr/XtZvrXJkM7oKWU1NA+cplfrWOmskQzZdwBGdjyMkF5S1qwyIT29WjcAyLq4xIa6mXXprItXL+uZKHesoKb94Kz18GMZF/JY5S2zjWT+ppl3AVnv3csEHyG9goyeUlbvy6ppP1bjzMPMGuzHjx9T3jfuFKOnPrbNzU0hXbOahlgpd6xH1gmeXZfOGiv9/v37lLuArPDvqRPSZEhn3RZmnIAZvYyM5ThbU+tY6cxwevv27ejveXR0NPp7Dp1tzNtsuSMjqI6Pj0ftbWT1MtSjf84wvO9FSI/ZvqNTk9EJGfSk25B1OztmsGaFtO3/l5NxIc8KpYXM3zYefI7Zmz44OBjtvW7Sk25A1pV2rIYXPZaskLas5XJqrEtnh9Ph4eEoJZto21mzDOPi2tPdopBeUYyXHqO3Ee+RsTHnYGTH0moteezs7KS+/+vXrx9U9oi/G++Rpbc7xWZDOvOHjN70Q3ob8XczHtIMV0OThPRyat0A4MWLF6nvHyWb+G7uE9Txd+LvZnVABiHdjrgdyhrlEA0wGsp9TsboZcVJltWI1aOXV+tCS9khPVwFdVzsVyndxJ+Nv5NZl49OyBSfvyRNT2bJfsgS779KjzjqdNGIMzcu7a0BP0Stu51EByS75DFclfaeP38+b+cxlO6unnW06yhvxJ/N3pS31/Y9W/Y1m82GZV4rvmeaDx8+LH0cD3ltbW3Ndnd3ZycnJ7O///77Px/n8+fPszdv3syePHkyybHc/PezZXyG+B6nsr29nfIZvn792kTbvvna3Nycf2fxmqpNX3/F557S/v7+Ksd3sGQ+Hqzynk2HdIhGtY7GvI7Xzs7OpA141kBIx8W11jDpqW0PV52hqZUQ0s2v3ZH5lLk0Sh2rq3kDgL29vfR/oyQ9ncvXNR/SvTTkeKDSayN+iFrXlh46DC0h3ajoKfWwF1pvvaqx1DpWerhq269evUr/d0oQn7PXSVpdLFWaOT21BNGLFtL3k7UBQIxymGL98dbb9kIvn/M2XYR0DCGaYsjSukRAW1Tp/mquS8ex7+/vp/8767S7u9v1UgfdLPof45mjx9ma6AX23MsYQ60zDxfiIp21zvS6xTnbe/vuJqTjStxiSSBrvd6e1NyTHq5KNq22g/hcvd8ldrV9VlyRW3qIGLe5poE/XK0bAFwX7SDKAi2Jh4WGlXa4x2FMYW3h1jBq7L3fBo4lcxfuKUVJr5VdeeJzZC1CVpvuQjpunSKoa65PRwNW5hhXVrhN2ZsersZn1x7UcW7GOdp7mWOhy93CF6t71RjUcQLGsWvA46q9Lr0Q7aLmoI5zMo7fxhX/6jKkh0qDOurpAjpHzZNabqo1qKMMuVjulH91G9LD1YkZJ1ENDxPjoZCAzpP1AHaK6eG3iXYSvfhaHibGORjHK6C/13VID9d6HTFSosRedRzThw8fPERJ1kq546ZoN9F+Sr5jjHNPB+Ru3Yf0wmJLrJJmJkbjXezkQq6skI7NIdZR8rgu2k8cQ2kdkeg9f/782SilnxDS18SJGk+VT05O1rZwTZxE8W9//fp13nj1LqaTVfZad0gPV3eM0Z5KCOv4nuMcU39ezsbVwtJLmc1mG8v8uY2NjVXeM+3DPVQ06AjtGO6WPeY1HvLEjMjo9dQUzBk11zhx1/EdxJ1UxqJI6/o8PxPtOtr38fFx+r8VDwWjbUcbr2nkRlzYDg8Pl/3jh7PZ7Ke3BRsbG/Fnll1w5VBILykCOwIpXnEyPzS0I5Tj5I0HVrUFM+1ZtO1F+37oRskRyov2Ha9ae8wlhPQvy/7rvYurfyw6fn3h8UXPKwL8Z7e0EcKLHpVbPEqzCNPrFndJy95hLP6+pQrGJaQfQNjSMqFbBg8OAQompAEKJqQBCiakAQompAEKJqQBCiakAQompAEKtvbJLFbAAkq1rvXAr1t7SK8wLx6gO8odAAUT0gAFE9IABRPSAAUT0gAFE9IABRPSAAUT0gAFE9IABcuacXjqRwc68+PdqO8pJaRns5mdKwFGoNwBUDAhDVAwIQ1QMCENUDAhDVAwIQ1QMCENUDAhDVCwlSazbGxs2DUW4GFWmuy36ozDfT8OwHSUOwAKJqQBCiakAQompAEKJqQBCiakAQompAEKJqQBCiakAQoWMw4P/UAABRqGT/8Dftwec86RP/AAAAAASUVORK5CYII=";
  doc.text("Hello world!", 10, 10);
  doc.addImage(imgData, "PNG", 5, 5, 40, 10);
  res.send(doc);
});

////////////////////////////////////////// edit Business Post Handling/////////////////////////////////////////
router.post("/generalData", (req, res) => {
  console.log(req.body);
  saveBusiness.saveGeneralData(req);
  res.send("Success");
});

router.post("/accountData", (req, res) => {
  saveBusiness.saveAccountsData(req);
  res.send("Success");
});
router;

router.post("/TIV", (req, res) => {
  saveBusiness.saveTIVData(req);
  res.send("Success");
});

router.post("/contact/new", (req, res) => {
  saveBusiness.saveBusinessNewContact(req);
  res.send("Success");
});

router.post("/contactData", (req, res) => {
  saveAllBusinessContacts(req);
  res.send("Success");
});

router.post("/activity/new", (req, res) => {
  saveBusiness.saveBusinessActivity(req, res);
});

router.post("/activity/validate", (req, res) => {
  var temp = req.body.formData[0].value;
  var splitActivityName = temp.slice(6, temp.length);
  var splitActivityID = temp.slice(0, 5);
  loadActivity.validateActivity(splitActivityID, splitActivityName, res);
});

router.post("/ownerData", (req, res) => {
  saveAllBusinessOwners(req, res);
  res.send("Success");
});

router.post("/owner/new", (req, res) => {
  saveBusiness.saveNewOwnerData(req.body);
  res.send("Success");
});

router.post("/owner/validate", (req, res) => {
  console.log(req.body.formData[2].value);
  saveBusiness.validateOwner(
    req.body.formData[0].value,
    req.body.formData[2].value,
    res
  );
});

module.exports = router;
