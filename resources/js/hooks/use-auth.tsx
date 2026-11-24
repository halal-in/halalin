import type { PageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";

interface AuthProps extends PageProps {
    auth: {
        user: {
            id: number,
            name: string,
            email: string,
            phone_number: number,
            is_verified: boolean,
            age: number,
            location: string;
            is_blocked: boolean;

            role: {
                id: number;
                name: string;
            }
        } | null;
    }
}

export function useAuth() {
    const { auth } = usePage<AuthProps>().props;

    return {
        user: auth?.user ?? null,
    }
}