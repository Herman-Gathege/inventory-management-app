# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS to allow communication with the React frontend
CORS(app)

# Initialize SQLAlchemy for database handling
db = SQLAlchemy(app)

# Define the Item model (database table structure)
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unique ID for each item
    name = db.Column(db.String(80), nullable=False)  # Item name
    quantity = db.Column(db.Integer, nullable=False)  # Quantity in stock
    price = db.Column(db.Float, nullable=False)  # Item price
    category = db.Column(db.String(50), nullable=False)  # Category of the item

    def to_dict(self):
        # Convert the Item object to a dictionary for JSON responses
        return {
            "id": self.id,
            "name": self.name,
            "quantity": self.quantity,
            "price": self.price,
            "category": self.category,
        }

# Create the database
with app.app_context():
    db.create_all()  # This will create the inventory.db file with the Item table

# API Endpoints
@app.route('/items', methods=['GET'])
def get_items():
    # Fetch all items from the database
    items = Item.query.all()
    return jsonify([item.to_dict() for item in items])

@app.route('/items', methods=['POST'])
def create_item():
    # Create a new item
    data = request.json
    new_item = Item(
        name=data['name'],
        quantity=data['quantity'],
        price=data['price'],
        category=data['category']
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_dict()), 201

@app.route('/items/<int:id>', methods=['PUT'])
def update_item(id):
    # Update an existing item
    data = request.json
    item = Item.query.get_or_404(id)
    item.name = data['name']
    item.quantity = data['quantity']
    item.price = data['price']
    item.category = data['category']
    db.session.commit()
    return jsonify(item.to_dict())

@app.route('/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    # Delete an item
    item = Item.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted"})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)

# # app.py
# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# from datetime import datetime

# # Initialize Flask app
# app = Flask(__name__)

# # Configure the SQLite database
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# # Enable CORS to allow communication with the React frontend
# CORS(app)

# # Initialize SQLAlchemy for database handling
# db = SQLAlchemy(app)

# # Define the Item model (database table structure)
# class Item(db.Model):
#     id = db.Column(db.Integer, primary_key=True)  # Unique ID for each item
#     name = db.Column(db.String(80), nullable=False)  # Item name
#     quantity = db.Column(db.Integer, nullable=False)  # Quantity in stock
#     price = db.Column(db.Float, nullable=False)  # Item price
#     category = db.Column(db.String(50), nullable=False)  # Category of the item

#     def to_dict(self):
#         # Convert the Item object to a dictionary for JSON responses
#         return {
#             "id": self.id,
#             "name": self.name,
#             "quantity": self.quantity,
#             "price": self.price,
#             "category": self.category,
#         }

# # Define the Transaction model (to log items-in and items-out activities)
# class Transaction(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
#     quantity = db.Column(db.Integer, nullable=False)  # Quantity added or removed
#     transaction_type = db.Column(db.String(50), nullable=False)  # "in" or "out"
#     date = db.Column(db.DateTime, default=datetime.utcnow)  # Date of transaction

#     item = db.relationship('Item', backref=db.backref('transactions', lazy=True))

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "item_id": self.item_id,
#             "quantity": self.quantity,
#             "transaction_type": self.transaction_type,
#             "date": self.date.strftime('%Y-%m-%d %H:%M:%S')
#         }

# # Create the database
# with app.app_context():
#     db.create_all()  # This will create the inventory.db file with the Item and Transaction tables

# # API Endpoints

# # Get all items
# @app.route('/items', methods=['GET'])
# def get_items():
#     items = Item.query.all()
#     return jsonify([item.to_dict() for item in items])

# # Add a new item
# @app.route('/items', methods=['POST'])
# def create_item():
#     data = request.json
#     new_item = Item(
#         name=data['name'],
#         quantity=data['quantity'],
#         price=data['price'],
#         category=data['category']
#     )
#     db.session.add(new_item)
#     db.session.commit()
#     return jsonify(new_item.to_dict()), 201

# # Update an existing item
# @app.route('/items/<int:id>', methods=['PUT'])
# def update_item(id):
#     data = request.json
#     item = Item.query.get_or_404(id)
#     item.name = data['name']
#     item.quantity = data['quantity']
#     item.price = data['price']
#     item.category = data['category']
#     db.session.commit()
#     return jsonify(item.to_dict())

# # Delete an item
# @app.route('/items/<int:id>', methods=['DELETE'])
# def delete_item(id):
#     item = Item.query.get_or_404(id)
#     db.session.delete(item)
#     db.session.commit()
#     return jsonify({"message": "Item deleted"})

# # Add stock (items-in)
# @app.route('/items/<int:id>/in', methods=['POST'])
# def add_stock(id):
#     data = request.json
#     item = Item.query.get_or_404(id)
#     quantity_in = data['quantity']
#     item.quantity += quantity_in

#     # Log the transaction
#     new_transaction = Transaction(
#         item_id=item.id,
#         quantity=quantity_in,
#         transaction_type='in'
#     )
#     db.session.add(new_transaction)
#     db.session.commit()

#     return jsonify({
#         "message": f"Added {quantity_in} units to {item.name}. New total: {item.quantity}",
#         "item": item.to_dict(),
#         "transaction": new_transaction.to_dict()
#     }), 200

# # Remove stock (items-out)
# @app.route('/items/<int:id>/out', methods=['POST'])
# def remove_stock(id):
#     data = request.json
#     item = Item.query.get_or_404(id)
#     quantity_out = data['quantity']

#     if item.quantity >= quantity_out:
#         item.quantity -= quantity_out

#         # Log the transaction
#         new_transaction = Transaction(
#             item_id=item.id,
#             quantity=quantity_out,
#             transaction_type='out'
#         )
#         db.session.add(new_transaction)
#         db.session.commit()

#         return jsonify({
#             "message": f"Removed {quantity_out} units from {item.name}. New total: {item.quantity}",
#             "item": item.to_dict(),
#             "transaction": new_transaction.to_dict()
#         }), 200
#     else:
#         return jsonify({"message": "Not enough stock available"}), 400

# # Get all transactions (items-in and items-out logs)
# @app.route('/transactions', methods=['GET'])
# def get_transactions():
#     transactions = Transaction.query.all()
#     return jsonify([transaction.to_dict() for transaction in transactions])

# # Run the app
# if __name__ == '__main__':
#     app.run(debug=True)
