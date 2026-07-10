"""General backend helpers."""


def ensure_data(value, default=None):
    return value if value is not None else default
