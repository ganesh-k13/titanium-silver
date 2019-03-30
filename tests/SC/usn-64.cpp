#include <iostream>
#include <chrono>
#include <thread>
#include <cstdlib>
#include <string>

int main(int args, char *argv[]) {
	std::this_thread::sleep_for(std::chrono::milliseconds(atoi(argv[2])));
	std::string to_print = "Hello container: ";
	to_print.append(argv[1]);
	std::cout << to_print;
	return 0;
}

