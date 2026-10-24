"use client"
import { authClient } from "@/lib/auth-client";


const SignUpPage = () => {


const onSubmit= async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());


    const {data,error}= await authClient.signUp.email({
        ...user,
        callBackURL:"/dashboard",
    })

    if(data){
        console.log("success data",data)
    }
    if (error){
        console.log("ERROR",error);
    }
}



    return (
        <div className="flex flex-col justify-center items-center mt-6">
            <h2 className="text-2xl font-bold text-red-700 pb-3">সাইন আপ</h2>
            <form onSubmit={onSubmit}>
                <fieldset className="justify-center fieldset  w-md pl-4">

                    <label className="label">Name</label>
                    <input name="name" type="name" className="input w-md" placeholder="Name" />


                    <label className="label">ImageURL</label>
                    <input name="image" type="text" className="input w-md" placeholder="ImageURL" />


                    <label className="label">Email</label>
                    <input name="email" type="email" className="input w-md" placeholder="Email" />

                    <label className="label">Password</label>
                    <input name="password" className="input w-md" type="password" placeholder="Password" />

                    <button type="submit" className="btn text-white bg-red-600 mt-4">সাইন আপ করুন</button>
                </fieldset>

            </form>
        </div>
    );
};

export default SignUpPage;