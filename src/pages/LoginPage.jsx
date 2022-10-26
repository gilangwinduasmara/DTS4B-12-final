import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";

export default function LoginPage(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        }
    });
    const handleSubmit = async () => {
        setLoading(true);
        try{
            const {user} = await signInWithEmailAndPassword(auth, form.values.email, form.values.password);
        }catch(error){
            if(error.code === 'auth/user-not-found'){
                setError('User not found');
            }else if(error.code === 'auth/wrong-password'){
                setError('Wrong password');
            }else{
                setError('Something went wrong');
            }
            setLoading(false);
        }
    }
    return (
        <div className="grid grid-cols-2 h-screen">
            <div className="bg-gradient-to-tr from-red-500 to-yellow-500"></div>
            <form onSubmit={form.onSubmit(handleSubmit)} className="my-auto px-48 space-y-4">
                {
                    error && (
                        <div className=" text-red-500 p-4">
                            {error}
                        </div>
                    )
                }
                <TextInput
                    placeholder="EMAIL"
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    placeholder="PASSWORD"
                    {...form.getInputProps('password')}
                />
                <Button type="submit" loading={loading} variant="filled" className="w-full bg-red-500">LOGIN</Button>
                <div>
                    <span className="text-gray-500">Don't have an account?</span>
                    <a href="/register" className="text-red-500 ml-2">Register</a>
                </div>
            </form>
        </div>
    )
}