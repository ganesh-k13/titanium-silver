import setuptools

with open("README.md", "r") as fh:
   long_description = fh.read()

setuptools.setup(
    name="titanium_silver",
    version="0.0.1",
    author="Ganesh Kathiresan, Rahul Bharadwaj",
    author_email="Ganesh Kathiresan <ganesh3597@gmail.com>, Rahul Bharadwaj <rahulbharadwaj033@gmail.com>",
    description="Lab automation using dockers",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/ganesh-k13/titanium-silver",
    packages=['titanium_silver'],
    package_dir = {'titanium_silver': 'titanium_silver/'},
    package_data={'titanium_silver': ['SC/*']},
    classifiers=(
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ),
    install_requires=[
          'pytest==3.6.1',
          'docker==3.5.0'
      ],
)
