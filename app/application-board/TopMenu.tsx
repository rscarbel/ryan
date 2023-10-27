"use client";

import React from "react";
import { TabMenu } from "primereact/tabmenu";

const TopMenu: React.FC = ({ activeIndex }) => {
  //items are [Board, Create New, Table View]
  const items = [
    {
      label: "Board",
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = "/application-board";
      },
    },
    {
      label: "Create New",
      icon: "pi pi-fw pi-plus",
      command: () => {
        window.location.href = "/application-board/create-card";
      },
    },
    {
      label: "Table View",
      icon: "pi pi-fw pi-table",
      command: () => {
        window.location.href = "/application-board/table";
      },
    },
  ];
  return (
    <div className="card">
      <TabMenu activeIndex={activeIndex} model={items} />
    </div>
  );
};

export default TopMenu;
