"use client";

import { DndContext } from "@dnd-kit/core";

interface Props {
    children: React.ReactNode;
}

const DndProvider = ({ children }: Props) => (
    <DndContext >
        {children}
    </DndContext>
);
export default DndProvider;
