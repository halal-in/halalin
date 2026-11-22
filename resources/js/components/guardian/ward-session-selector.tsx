import { Button } from '@/components/ui/button';
import type { GuardianInterestItem } from '@/types/guardian';

interface WardSessionSelectorProps {
    interests: GuardianInterestItem[];
    activeId: number;
    onSelect: (id: number) => void;
}

export function WardSessionSelector({
    interests,
    activeId,
    onSelect,
}: WardSessionSelectorProps) {
    if (interests.length <= 1) return null;

    return (
        <div className="flex gap-2 overflow-x-auto pb-1">
            {interests.map((item) => (
                <Button
                    key={item.id}
                    variant={item.id === activeId ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onSelect(item.id)}
                >
                    {item.ward.name} ↔ {item.counterpart.name}
                </Button>
            ))}
        </div>
    );
}