Inventory Management System
A simple and efficient inventory management system designed to track and manage stock levels in real-time. This system allows users to add and remove items from the inventory, keeping a record of stock transactions with timestamps. Built with a React.js frontend and Flask backend, this app supports tracking of stock quantities and transaction history for each item.

Features
1. Stock Management
Items-In: Add stock to existing items, with the quantity and date of addition recorded in the transaction history.
Items-Out: Remove stock from existing items, with the quantity and date of removal recorded.
Transaction History: Each stock update (either addition or removal) is saved in the transaction history, showing the quantity and date of the transaction.
2. Item List Display
Displays a list of all items with their current stock quantities.
Each item shows its transaction history, including the dates and quantities added or removed.
3. Interactive UI with React
A user-friendly interface that allows users to interact with the system seamlessly.
Users can add or remove stock from items, and see their actions reflected instantly in the list.
StockForm: A form component that handles the addition/removal of stock for each item.
ItemList: Displays all items and their current stock levels, as well as their transaction history.
4. Flask Backend
API Endpoints:
GET /items: Retrieve a list of all items with their current stock and transaction history.
POST /items/<item_id>/in: Add stock to an item and record the transaction.
POST /items/<item_id>/out: Remove stock from an item and record the transaction.
Database: Uses Flask with SQLAlchemy to persist item data and transaction history.
5. Transaction Tracking
Each stock transaction (in or out) is recorded with:
The item’s name and category.
The quantity added or removed.
The timestamp of the transaction.
This ensures a detailed log of stock movements for accurate tracking.
Technologies Used
Frontend: React.js, Bootstrap
Backend: Flask, SQLAlchemy
Database: SQLite (for local development), PostgreSQL (for production)
API Testing: Postman
Version Control: Git, GitHub
Project Structure
Backend (Flask)
app.py: Main Flask application where API routes are defined.
models.py: Defines the database models (Item and Transaction models).
seed.py: Seeds the database with initial data for testing purposes.
config.py: Configuration settings for Flask and SQLAlchemy.
requirements.txt: List of Python dependencies required for the backend.
Frontend (React)
App.js: The main React component that controls the rendering of the page.
ItemForm.js: The form component that handles adding and removing stock.
ItemList.js: Displays a list of items, their current stock levels, and transaction history.
components/: Contains reusable components like forms, buttons, and table rows.
Installation
1. Backend Setup
To set up the backend (Flask):

Clone the repository:

bash
Copy code
git clone <repository-url>
cd inventory-management
Navigate to the backend folder and create a virtual environment:

bash
Copy code
cd backend
python3 -m venv venv
source venv/bin/activate  # For Windows, use `venv\Scripts\activate`
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Run the Flask app:

bash
Copy code
flask run
The Flask API will be available at http://127.0.0.1:5000/.

2. Frontend Setup
To set up the frontend (React):

Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the React app:

bash
Copy code
npm start
The frontend will be available at http://localhost:3000/.

3. Database Setup
By default, the project uses SQLite for local development. For production, you can configure PostgreSQL.
Ensure that the Flask app has access to the database by running the necessary migrations (if applicable).
How It Works
View Inventory: The homepage lists all items in the inventory along with their current stock levels and transaction history.

Add Stock: Users can add stock to an item by filling out the "Add Stock" form. The form captures the item’s name, quantity, and category. Upon submission, the backend updates the stock and logs the transaction.

Remove Stock: Users can remove stock by filling out the "Remove Stock" form. The form allows users to specify the quantity to remove. The backend updates the stock and logs the transaction.

Transaction History: Each stock update (whether adding or removing stock) is saved in the transaction history, which users can view to track stock changes over time.

Next Steps
1. Sorting Items
Implement sorting functionality for the inventory list by clicking the column headers (e.g., sort by name, quantity, or transaction history).
Add visual cues (e.g., up/down arrows) to indicate the active sort direction.
2. Testing Sorting
Test the sorting functionality by interacting with the column headers.
Ensure that the list updates according to the chosen sorting method.
3. CSS Styling
Add custom styles to enhance the user interface, such as styling the transaction history and the forms for adding/removing stock.
4. Optional Features
Filtering: Implement a feature to filter items based on specific criteria like category or stock levels.
Pagination: For large inventories, implement pagination to display items in smaller chunks.
Error Handling: Improve user experience by adding validation for inputs (e.g., prevent removing more stock than available).
Contributing
Feel free to contribute to this project by submitting issues or pull requests. If you have any suggestions or would like to add new features, please open an issue or send a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Conclusion
This inventory management system provides an easy way to track and manage stock levels. With features like stock addition/removal and transaction tracking, it offers a complete solution for managing inventory. Future enhancements like sorting, filtering, and pagination will further improve usability and performance.

