import React from 'react';

const TeacherDetailsPage: React.FC = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3">left</div>
      <div className="w-full xl:w-1/3">right</div>
    </div>
  );
};

export default TeacherDetailsPage;
