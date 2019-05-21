sh -c javac /opt/%s.java && java -cp /opt %s %s < %s
# (container_name, container_name, self.params, test_case_in)