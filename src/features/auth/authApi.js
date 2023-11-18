 export function createUser(userData){
    return new Promise(async(resolve)=>{
        const response = await fetch('http://localhost:8080/users',{
            method:'POST',
            body: JSON.stringify(userData),
            headers:{'content-type':'application/json'}
        })
        const data = await response.json();

        resolve({data})

    })
 }

 export function checkUser(LoginInfo){
    return new Promise(async(reslove,reject)=>{
       
        const email = LoginInfo.email;
        const password = LoginInfo.password;
         
      
        const response = await fetch('http://localhost:8080/users?email='+email)
         
        const data =await response.json()
   
        console.log(data[0])
        if(data){
          
            if(password === data[0].password){
                reslove({data:data})
            }else{
                reject({message:'worng credentials'})
            }
        }else{
            reject({message:'user not found'})
        }
    })
 }