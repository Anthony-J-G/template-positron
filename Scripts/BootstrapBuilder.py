import subprocess
import os


def is_golang_installed():
    try:
        result = subprocess.run(['go', 'version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode == 0:
            print(f"Golang is installed: {result.stdout.strip()}")
            return True
        else:
            print(f"Golang is not installed: {result.stderr.strip()}")
            return False
    except FileNotFoundError:
        print("Golang is not installed: 'go' command not found")
        return False


def compile_builder():
    working_dir = os.getcwd()
    os.chdir("Source/Builder")
    try:
        result = subprocess.run(['go', 'build', '-o', '../../builder.exe', './cmd/build-system'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode == 0:
            print("Successfully compiled builder")
        else:
            print(f"Failed to compile builder:\n\t{result.stderr.strip()}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    os.chdir(working_dir)



if __name__ == "__main__":
    if is_golang_installed():
        compile_builder()
