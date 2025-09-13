// import mongoose from "mongoose";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { User } = require("./../models/userModel");
const sql = require('mssql')
const sqlConfig = require('../utils/db')
const _ =  require('lodash')
const {sendMailll } = require('../utils/sendEmails')

  // await sql.connect(sqlConfig)
  // const result = await sql.query`select * from tblStudentUsers where [studentID]=${studentID}`
  // const result = await sql.query` insert into tblStudentUsers (studentName,studentID,Password) values (${studentName},${studentID},${Password})`
  // const result = await sql.query`update tblStudentUsers set [Password]=${Password}  where [studentID]=${studentID}`

  function generateRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}
const register = async(req, res) => {

   const studentName = req.body.studentId;
   const studentID = req.body.studentId;
   const Password = generateRandomSixDigitNumber();
   console.log(studentName);
   console.log(studentID);
   console.log(Password);
  try {
    sql.connect(sqlConfig).then(pool => {
      return pool.request()
          .input('param1', sql.VarChar(50), studentName)
          .input('param2', sql.VarChar(50), studentID)
          .input('param3', sql.BigInt, Password)
          .query('insert into tblStudentUsers (studentName,studentID,Password) values (@param1,@param2,@param3)')
            }).then(result => {
              const user = result.rowsAffected[0]
              if (user === 1) {
                res.send({message: "success"})
              }else{
                res.send({message: "failure"})
              }
            }).catch(err => {
              console.log(err)
            })

  } catch (error) {
    console.log(error)
    return res.status(400).send('Server error: table or colunm name is incorect!');
  }
};

const logIn = async(req, res) => {
  const studentID = req.body.studentId
  const Password = req.body.password
  try {
    sql.connect(sqlConfig).then(pool => {
      return pool.request()
          .input('param1', sql.VarChar(50), studentID)
          .input('param2', sql.BigInt, Password)
          .query('SELECT * FROM viewWebAuthentication WHERE studentID=@param1 AND Password= @param2')
            }).then(result => {
              const userData = result.recordset;
              const user = userData[0]
              if (!user) {
                res.json({ message: "Authentication failed. Your studentID or Password is incorrect!" });}
              else{
                  return res.json({
                    token: jwt.sign(
                      {
                        StudentNumber: user.StudentNumber, 
                        StudentID: user.StudentID,
                        StudentName: user.StudentName, 
                        email: user.email,
                        ProgramName: user.ProgramName, 
                        DepartmentID: user.DepartmentID, 
                        DepartmentName: user.DepartmentName, 
                        BatchID: user.BatchID,
                        CurriculumVersion: user.CurriculumVersion,
                      },
                      "RESTFULAPIs"
                    ),
                  });
              }

            }).catch(err => {
              console.log(err)
            })

  } catch (error) {
    console.log(error)
    return res.status(400).send('Server error: table or colunm name is incorect!');
  }
  
};

const isUserExist = async(req, res) => {
  const studentID = req.body.studentId
  const Password = req.body.currentPassword
  try {
    sql.connect(sqlConfig).then(pool => {
      return pool.request()
          .input('param1', sql.VarChar(50), studentID)
          .input('param2', sql.VarChar(50), Password)
          .query('SELECT * FROM viewWebAuthentication WHERE studentID=@param1 AND Password= @param2')
            }).then(result => {
              const userData = result.recordset;
              const user = userData[0]
              if (!user) {
                res.send(false)
              }
              else{
                  return res.send(true);
              }
            }).catch(err => {
              console.log(err)
            })

  } catch (error) {
    console.log(error)
    return res.status(400).send('Server error: table or colunm name is incorect!');
  }
  
};
const isUserExist2 = async(req, res) => {
  const studentID = req.body.studentId
  try {
    sql.connect(sqlConfig).then(pool => {
      return pool.request()
          .input('param1', sql.VarChar(50), studentID)
          .query('SELECT * FROM viewWebAuthentication WHERE studentID=@param1')
            }).then(result => {
              const userData = result.recordset;
              const user = userData[0]
              if (!user) {
                res.send(false)
              }
              else{
                  return res.send(true);
              }
            }).catch(err => {
              console.log(err)
            })

  } catch (error) {
    console.log(error)
    return res.status(400).send('Server error: table or colunm name is incorect!');
  }
  
};

const isStudentExist = async(req, res) => {
  const studentID = req.body.studentId
  try {
    sql.connect(sqlConfig).then(pool => {
      return pool.request()
          .input('param1', sql.VarChar(50), studentID)
          .query('SELECT * FROM TblStudent WHERE StudentID=@param1')
            }).then(result => {
              const userData = result.recordset;
              const user = userData[0]
              if (!user) {
                res.send(false)
              }
              else{
                  return res.send(true);
              }
            }).catch(err => {
              console.log(err)
            })

  } catch (error) {
    console.log(error)
    return res.status(400).send('Server error: table or colunm name is incorect!');
  }
  
};

const changePassword = async(req, res) => {
  const studentID = req.body.studentId
  const Password = req.body.newPassword
  try {
    sql.connect(sqlConfig).then(pool => {
      return pool.request()
          .input('param1', sql.VarChar(50), studentID)
          .input('param2', sql.VarChar(50), Password)
          .query('update tblStudentUsers  set [Password]=@param2  where [studentID]=@param1')
            }).then(result => {
              const user = result.rowsAffected[0]
              if (user === 1) {
                res.send("Your password was changed successfully.")
              }
            }).catch(err => {
              console.log(err)
            })
  } catch (error) {
    console.log(error)
    return res.status(400).send('Server error: table or colunm name is incorect!');
  }
  
};


const LogInRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "Authentication failed. No user found" });
  }
};

const getCurrentSemester = async(req, res) => {
  const studentNumber = req.params.studentNumber
  try {
    sql.connect(sqlConfig).then(pool => {
      return pool.request()
          .input('param1', sql.Int, studentNumber)
          .query('select max(semesterID) as semster from TblResult where StudentID=@param1')
            }).then(result => {
              const userData = result.recordset;
              const user = userData[0]
              if(user){
                return res.send(user)
              }
            }).catch(err => {
              console.log(err)
            })

  } catch (error) {
    console.log(error)
    return res.send(error);
  }
  
};

const getStudentEmail = async(req, res) => {
  const studentID = req.params.studentId
  try {
    sql.connect(sqlConfig).then(pool => {
      return pool.request()
          .input('param1', sql.VarChar(50), studentID)
          .query('select email from TblStudent where StudentID=@param1')
            }).then(result => {
              const userData = result.recordset;
              const user = userData[0]
              if(user){
                return res.send(user)
              }
            }).catch(err => {
              console.log(err)
            })

  } catch (error) {
    console.log(error)
    return res.send(error);
  }
  
};

const getStudentPassowrd = async(req, res) => {
  const studentID = req.params.studentId
  try {
    sql.connect(sqlConfig).then(pool => {
      return pool.request()
          .input('param1', sql.VarChar(50), studentID)
          .query('select Password from tblStudentUsers where StudentID=@param1')
            }).then(result => {
              const userData = result.recordset;
              const user = userData[0]
              if(user){
                return res.send(user)
              }
            }).catch(err => {
              console.log(err)
            })

  } catch (error) {
    console.log(error)
    return res.send(error);
  }
  
};
const getAllSemsters = async(req, res) => {
  const studentNumber = req.params.studentNumber
  try {
    sql.connect(sqlConfig).then(pool => {
      return pool.request()
          .input('param1', sql.Int, studentNumber)
          .query('select Distinct semesterID  from TblResult where StudentID=@param1')
            }).then(result => {
              const user = result.recordset;
              if(user){
                return res.send(user)
              }
 
            }).catch(err => {
              console.log(err)
            })

  } catch (error) {
    console.log(error)
    return res.send(error);
  }
  
};

const getResults = async(req, res) => {
  const studentNumber = req.params.studentNumber
  const depID = req.params.depID
  const CurriculumVersion = req.params.CurriculumVersion
  try {
    sql.connect(sqlConfig).then(pool => {
      return pool.request()
          .input('param1', sql.Int, studentNumber)
          .input('param2', sql.Int, depID)
          .input('param3', sql.Int, CurriculumVersion)
          .query('select * from ViewOnlineResultDetail where StudentID=@param1 and DepID=@param2 and CurriculumVersion=@param3')
            }).then(result => {
              const rslt = result.recordset;
              const allResults = convertToResults(rslt)
              if(rslt){
                return res.send(allResults)
              }
            }).catch(err => {
              console.log(err)
            })

  } catch (error) {
    console.log(error)
    return res.send(error);
  }
  
};

const convertToResults = (data) => {
  // Group by semester
  const groupedBySemester = _.groupBy(data, 'Semester');

  // Convert grouped object to array of Result objects
  return Object.keys(groupedBySemester).map(semesterKey => {
      const subjects = groupedBySemester[semesterKey];
      const groupedSubjects = _.groupBy(subjects, 'SubjectID');

      return {
          id: parseInt(semesterKey, 10), // Use semester as id
          semester: semesterKey, // Use semesterKey as a string
          subjects: _.map(groupedSubjects, (subjectList) => {
              const subject = _.first(subjectList);
              return {
                  SubjectID: subject.SubjectID,
                  SubjectName: subject.SubjectName,
                  MidTerm: subject.MidTerm,
                  Final: subject.Final,
                  Oral: subject.Oral,
                  Total: subject.Total,
              };
          })
      };
  });
};

  
const UpdateUser = async (req, res) => {

  const prevEmail = req.params.email
  const userName = req.body.userName;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  // const email = req.body.email;
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  const avatar = req.body.avatar;
  const role = req.body.role;

  try {
    await User.update({  userName: userName,
        firstName: firstName,
        lastName: lastName,
        hashPassword: hashPassword,
        avatar: avatar,
        role: role, },
      {  where: { email: prevEmail }});
      res.json({ message: "userData succesfully updated!" });
    
  } catch (error) {
    console.log(error)
    return res.send(error);
  }
  
};

const DeleteUser = async (req, res) => {
  const prevEmail = req.params.email
  try {
    await User.destroy({  where: { email: prevEmail }})
    res.json({ message: "userData succesfully deleted!" });
  } catch (error) {
    console.log(error)
    return res.send(error);
  }
 

};

const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const sendEmail = async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const studentId = req.body.studentId;
  
  // sendDirectEmail(email, password, studentId)
  const ress = await sendMailll(password,studentId,email)
  return res.json(ress)
}

module.exports = {
  register,
  logIn,
  getCurrentSemester,
  UpdateUser,
  DeleteUser,
  LogInRequired,
  getAllSemsters,
  getResults,
  isUserExist,
  isUserExist2,
  isStudentExist,
  changePassword,
  getStudentEmail,
  sendEmail,
  getStudentPassowrd
};
