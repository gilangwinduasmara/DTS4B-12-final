import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
            passwordConfirm: (value) => (value === form.values.password ? null : 'Password does not match'),
        }
    });
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const {user} = await createUserWithEmailAndPassword(auth, form.values.email, form.values.password);
            navigate('/login');
        }catch(error){
            console.log(error);
            alert('Something went wrong');
            setLoading(false);
        }
    }
    return (
        <div className="grid grid-cols-2 h-screen">
            <div className="bg-gradient-to-tr from-red-500 to-yellow-500"></div>
            <form className="my-auto px-48 space-y-2" onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    placeholder="EMAIL"
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    placeholder="PASSWORD"
                    {...form.getInputProps('password')}
                />
                <PasswordInput
                    placeholder="CONFIRM PASSWORD"
                    {...form.getInputProps('passwordConfirm')}
                />
                <Button loading={loading} type="submit" variant="filled" className="w-full bg-red-500">REGISTER</Button>
                <div>
                    <span className="text-gray-500">Already have an account?</span>
                    <a href="/login" className="text-red-500 ml-2">Login</a>
                </div>
            </form>
        </div>
    )
}