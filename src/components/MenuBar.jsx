import { ActionIcon, Button, Group, Header, Menu } from "@mantine/core";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export default function MenuBar() {
    const [isTop, setIsTop] = useState(true);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        document.addEventListener('scroll', () => {
            setIsTop(window.scrollY < 100);
        });
    }, []);

    useEffect(() => {
        console.log(isTop);
    }, [isTop])
    return (
        <Header height={60} className={`${isTop ? 'bg-transparent border-0' : 'bg-black'} text-white transition-all delay-100`}>
            <div className="h-full flex px-4 justify-between items-center">
                <div className="flex items-center">
                    PFLIX
                </div>
                <div>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <div>{user?.email}</div>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item onClick={() => {
                                signOut(auth);
                                navigate('/login');
                            }}>Logout</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            </div>

        </Header>
    )
}