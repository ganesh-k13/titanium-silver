#!/bin/bash
sh -c gcc /opt/%s.c -o /opt/%s && /opt/%s %s < %s
# (container_name, container_name+str(container_no), container_name+str(container_no), self.params, test_case_in)