import json
import os.path


def make_dir(path: str):
    print(f"Path chosen for app data: {path}")
    try:
        os.mkdir(path)
        print("Created dir")
    except FileExistsError:
        pass


def setup_app_data_dir() -> str:
    """Gets the folder where to store log files.

    :return: Path to logs folder.
    :rtype: str
    """
    path = os.path.join(os.getenv("localappdata"), "Discord.fm")
    make_dir(path)
    return path


def save():
    json_string = json.dumps(__settings_dict, indent=4)

    with open(config_path, "w") as file:
        file.write(json_string)


__settings_dict: dict

app_data_path = setup_app_data_dir()
logs_path = app_data_path
config_path = os.path.join(app_data_path, "settings.json")

try:
    with open(config_path) as file:
        __settings_dict = json.load(file)
except FileNotFoundError:
    __settings_dict = {  # Put default setting values here
        "cooldown": 2,
        "username": "andodide",
        "max_logs": 25
    }
    save()


def get(name):
    return __settings_dict[name]


def define(name, value):
    if __settings_dict.keys().__contains__(name):
        __settings_dict[name] = value
        save()
    else:
        raise KeyError("Key not found in settings dictionary")
