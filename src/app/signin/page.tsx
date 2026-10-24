import React from 'react';

const SignInPage = () => {
    return (
        <div>
           
            <div className="flex flex-col justify-center items-center mt-6">
                <h2 className="text-2xl font-bold text-red-700 pb-3">সাইন ইন</h2>
                <form>
                    <fieldset className="justify-center fieldset  w-md pl-4">

                        <label className="label">Email</label>
                        <input name="email" type="email" className="input w-md" placeholder="Email" />

                        <label className="label">Password</label>
                        <input name="password" className="input w-md" type="password" placeholder="Password" />

                        <button className="btn text-white bg-red-600 mt-4">সাইন ইন করুন</button>
                    </fieldset>

                </form>
            </div>


        </div>
    );
};

export default SignInPage;