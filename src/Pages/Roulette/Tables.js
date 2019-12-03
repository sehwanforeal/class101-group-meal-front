import React from "react";

export default function Tables(props) {
  const { list } = props;

  const renderTables = list => {
    return list.map((group, i) => {
      const members = group.map((member, j) => {
        return (
          <input
            value={member}
            onChange={e => this.identifierMethod(e, i, j)}
            className={j === 0 && "driver"}
          />
        );
      });

      return <div className="group">{members}</div>;
    });
  };

  return renderTables(list);
}
