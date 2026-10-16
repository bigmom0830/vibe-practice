import json
import os

FILENAME = "todos.json"

def load_todos():
    """저장된 할 일 목록 불러오기"""
    if not os.path.exists(FILENAME):
        return []
    with open(FILENAME, "r", encoding="utf-8") as file:
        return json.load(file)

def save_todos(todos):
    """할 일 목록 저장하기"""
    with open(FILENAME, "w", encoding="utf-8") as file:
        json.dump(todos, file, ensure_ascii=False, indent=2)

def show_todos(todos):
    """목록 출력"""
    if not todos:
        print("\n[!] 등록된 할 일이 없습니다.")
        return
    print("\n--- 📋 나의 할 일 목록 ---")
    for i, todo in enumerate(todos, 1):
        status = "✅" if todo["done"] else "❌"
        print(f"{i}. [{status}] {todo['task']}")
    print("-" * 25)

def main():
    todos = load_todos()
    
    while True:
        print("\n[1] 목록 보기  [2] 추가하기  [3] 완료 표시  [4] 삭제하기  [5] 종료")
        choice = input("원하는 작업 번호를 입력하세요: ").strip()

        if choice == "1":
            show_todos(todos)
        elif choice == "2":
            task = input("새로운 할 일을 입력하세요: ").strip()
            if task:
                todos.append({"task": task, "done": False})
                save_todos(todos)
                print(f"등록 완료: '{task}'")
        elif choice == "3":
            show_todos(todos)
            try:
                num = int(input("완료 처리할 번호: ")) - 1
                todos[num]["done"] = True
                save_todos(todos)
                print("완료 처리되었습니다!")
            except (ValueError, IndexError):
                print("[!] 올바른 번호를 입력해 주세요.")
        elif choice == "4":
            show_todos(todos)
            try:
                num = int(input("삭제할 번호: ")) - 1
                removed = todos.pop(num)
                save_todos(todos)
                print(f"삭제 완료: '{removed['task']}'")
            except (ValueError, IndexError):
                print("[!] 올바른 번호를 입력해 주세요.")
        elif choice == "5":
            print("프로그램을 종료합니다.")
            break
        else:
            print("[!] 1~5 사이의 숫자를 입력하세요.")

if __name__ == "__main__":
    main()
