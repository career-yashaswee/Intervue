import React from "react";
import UserSheet from "./UserSheet";
import UserDropdownMenu from "./UserDropdownMenu";
import UserSearchBar from "./UserSearchBar";
function DashboardHeader({ view, isSearchRequired = false }) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <h1 className="text-lg font-semibold md:text-2xl gradient-text">
        {view}
      </h1>
      <UserSheet></UserSheet>
      <div></div>
      {isSearchRequired ? (
        <UserSearchBar></UserSearchBar>
      ) : (
        <div className="w-full flex-1"></div>
      )}

      <UserDropdownMenu></UserDropdownMenu>
    </header>
  );
}

export default DashboardHeader;
