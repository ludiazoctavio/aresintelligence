from django.shortcuts import render
from itertools import combinations_with_replacement
from django.http import JsonResponse
import json


def home(request):

    return render(request, 'index.html')


def calculate(request):

    if request.is_ajax():
        s = 0
        value = json.loads(request.POST['value'])
        data = []
        p = {str(i): i ** value for i in range(10)}

        for cx in combinations_with_replacement('0123456789', value + (value >= 5)):
            t = sum(p[x] for x in cx)
            sd = sum(p[x] for x in str(t))
            if t == sd and t > 9:
                s += t
                data.append(t)

    return JsonResponse({'value':value,'data_sum':data})