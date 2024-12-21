"use client";

import "./header.scss";
import { Skeleton } from "@radix-ui/themes";

const SKELETON_HEADER_ITEMS = [1, 2, 3]; // Representing skeleton elements for title and menu items.

export const HeaderSkeleton = () => {
    return (
        <nav id="Header" aria-label="header" className="header-nav h-20" >
            <div className="title">
                {/* Skeleton for logo */}
                <Skeleton className="rounded-full" width="40px" height="40px" />
                <div className="title-text flex flex-col gap-2">
                    <Skeleton width="150px" height="10px" />
                    <Skeleton width="100px" height="10px" />
                </div>
            </div>

            <div className="menu-container">
                {/* Skeleton for menu items */}
                {SKELETON_HEADER_ITEMS.map((item, index) => (
                    <Skeleton key={index} width="80px" height="30px" />
                ))}
            </div>
        </nav>
    );
};
