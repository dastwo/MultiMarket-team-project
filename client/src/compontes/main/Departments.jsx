import React from 'react';
import './department.css';
 
export default function Departments(props) {
  return (
    <div>
      <div class="departmentImg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
        <a href="#" className="group">
          <img
            src={props.department.coverImage}
            alt={props.department.name}
            className="image-depart group-hover:opacity-75"
          />
          <div class="px-6 py-4 bg-transparent text-right">
            <div class="font-bold text-xl mb-2">{props.department.name}</div>
          </div>
        </a>
      </div>
    </div>
  );
}
 



