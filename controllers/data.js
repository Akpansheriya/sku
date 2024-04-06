const Database = require("../config/connection");
const data = Database.data;



const addData = async (req, res) => {
      const Data = {
       
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        year_of_birth: req.body.year_of_birth,
        code: req.body.code,
        image:req.file ?
        req.protocol +
        "://" +
        req.get("host") +
        `/profile/${req.file.filename}` : "",
     
      };
      if (Data.name === "" || Data.name === null) {
        return res.status(400).send({ message: "name is required" });
      } else if (Data.surname === "" || Data.surname === null) {
        return res.status(400).send({ message: "surname is required" });
      } else if (Data.age === "" || Data.age === null) {
        return res.status(400).send({ message: "age is required" });
      } else if (Data.year_of_birth === "" || Data.year_of_birth === null) {
        return res.status(400).send({ message: "year of birth is required" });
      } else if (Data.code === "" || Data.code === null) {
        return res.status(400).send({ message: "code is required" });
      }else if (req.file === "" || req.file === null) {
        return res.status(400).send({ message: "image is required" });
      }else {
     await data.create(Data).then((result) => {
          
            res.status(201).send({
              message: "user created",
              result: result,
            });
          });
        }
    
  };


  const getData = async (req, res) => {
    try {
        const result = await data.findAll();
        res.status(200).send({
            message: "data list",
            result,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

  
  


module.exports = {
    addData,
    getData,
    
}