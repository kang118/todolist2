from flask import Flask, jsonify, json, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.db"
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.Text, nullable = False)

    def __str__(self):
        return f'{self.id} {self.content}'

def todo_serializer(todo):
    return{
        'id': todo.id,
        'content': todo.content
    }

@app.route("/api", methods=['GET'])
def index():
    return jsonify([*map(todo_serializer, Todo.query.all())])

@app.route("/api/create", methods=['POST'])
def create():
    data = request.get_json(silent=True)
    item = data.get('content')
    todo = Todo(content = item)
    db.session.add(todo)
    db.session.commit()
    return {'201': 'todo created successfully'}

@app.route('/api/<int:id>')
def show(id):
    return jsonify([*map(todo_serializer, Todo.query.filter_by(id=id))])

@app.route('/api/<int:id>', methods=['POST'])
def delete(id):
    data = request.get_json(silent=True)
    item = data.get('id')
    Todo.query.filter_by(id=item).delete()
    db.session.commit()
    return {'204': 'Deleted Successfully'}

@app.route('/api/edit/<int:id>', methods=['POST'])
def edit(id):
    data = request.get_json(silent=True)
    content = data.get('content')
    editid = data.get('id')
    edit = Todo.query.filter_by(id=editid).first()
    new_content = content
    edit.content = new_content
    db.session.commit()
    return {'204': 'Updated Successfully'}

if __name__ == '__main__':
    app.run(debug=True)
