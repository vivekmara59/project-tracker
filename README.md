# Project Tracker UI 

## Live Demo
https://project-tracker-app-eight.vercel.app/

## Setup Instructions
```bash
npm install
npm run dev


State Management
I used Zustand for state management because it is lightweight, scalable, and avoids unnecessary boilerplate. It allows easy sharing of state across multiple components while keeping the code clean and maintainable.


Features

Kanban Board
4 columns: To Do, In Progress, In Review, Done
Custom drag-and-drop implementation (no external libraries)
Drag overlay that follows cursor
Placeholder to prevent layout shift
Smooth and responsive interactions

List View
Displays all tasks in tabular format
Sorting:
Title (A–Z / Z–A)
Priority (Critical → Low)
Due Date (earliest first)
Virtual scrolling implemented manually
Handles 500+ tasks efficiently without performance issues

Timeline View (Gantt Chart)
Horizontal timeline for current month
Tasks displayed as bars based on start and due dates
Today marker (vertical red line)
Priority-based color coding

Technical Decisions
Framework: React (Vite) + TypeScript
Styling: Tailwind CSS
State Management: Zustand
Drag & Drop: Built from scratch using pointer events
Virtualization: Custom implementation without libraries

Drag-and-Drop Implementation
Uses pointer events (pointerdown, pointermove, pointerup)
Tracks dragged task globally using Zustand
Renders a floating overlay for smooth dragging
Updates task status on drop
Handles edge cases like dropping outside the column

Virtual Scrolling Approach
Only visible rows + buffer are rendered
Uses scrollTop to calculate visible indices
Maintains full scroll height using a spacer container
Prevents DOM overload and improves performance

Performance
Smooth rendering with large datasets (500+ tasks)
Minimal DOM nodes using virtualization
Optimized re-renders using Zustand

Future Improvements
Add animations for drag-and-drop
Keyboard accessibility support
API integration for real data
Better mobile responsiveness
